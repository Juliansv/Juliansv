import Image, { type ImageProps } from "next/image";
import { imagePlaceholders } from "@/data/generated/image-placeholders";

type ProjectImageProps = Omit<ImageProps, "placeholder" | "blurDataURL"> & {
	src: string;
};

export const ProjectImage = ({ src, ...rest }: ProjectImageProps) => {
	const blurDataURL = imagePlaceholders[src];
	return (
		<Image
			src={src}
			{...rest}
			{...(blurDataURL && { placeholder: "blur" as const, blurDataURL })}
		/>
	);
};
