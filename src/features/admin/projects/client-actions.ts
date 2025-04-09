import { createClient } from "@/utils/supabase/client";
import { redirect } from "next/navigation";

export async function uploadProjectImage(file: File) {
	const supabase = await createClient();

	const { data, error } = await supabase.auth.getUser();
	if (error || !data?.user) {
		redirect("/login");
	}

	// Upload image file to supabase bucket
	const fileExt = file?.name.split(".").pop();
	const fileName = `${Date.now()}.${fileExt}`;
	const filePath = `projects/${fileName}`;

	console.log("file from image uploader: ", file);

	const { error: imageError } = await supabase.storage
		.from("portfolio-images")
		.upload(filePath, file);

	// check if there was an error during upload
	if (imageError) {
		throw new Error("Error while uploading file to bucket");
	}

	const { data: imageData } = await supabase.storage
		.from("portfolio-images")
		.getPublicUrl(filePath);

	console.log("public URL: ", imageData.publicUrl);

	return imageData.publicUrl;
}
