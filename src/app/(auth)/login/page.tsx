import { login } from "@/app/(auth)/auth/actions";

export default function LoginPage() {
	return (
		<div className="flex min-h-screen">
			<div className="m-auto p-4 bg-white rounded-md h-[30rem] w-96 text-black flex flex-col">
				<h1 className="text-2xl font-bold w-full text-center py-6">
					Log in
				</h1>
				<form className="flex flex-col gap-4 grow">
					<label htmlFor="email">Email:</label>
					<input
						id="email"
						name="email"
						type="email"
						required
						className="bg-slate-100 h-12 border border-slate-300 focus-visible:border-slate-400 outline-slate-500 rounded-md text-slate-900 p-4 text-xl"
					/>
					<label htmlFor="password">Password:</label>
					<input
						id="password"
						name="password"
						type="password"
						required
						className="bg-slate-100 h-12 border border-slate-300 focus-visible:border-slate-400 outline-slate-500 rounded-md text-slate-900 p-4 text-4xl"
					/>
					<button
						formAction={login}
						className="w-40 h-14 rounded-md m-auto bg-green-500 text-white font-semibold hover:bg-green-600"
					>
						Log in
					</button>
				</form>
			</div>
		</div>
	);
}
