import type { ReactElement } from "react";

interface OgTemplateProps {
	eyebrow: string;
	title: string;
	subtitle: string;
	footer?: string | ReactElement;
}

const DARK_PURPLE = "#0a0a23";
const SKY_400 = "#38bdf8";
const SLATE_100 = "#f1f5f9";
const SLATE_400 = "#94a3b8";

export function renderOgImage({
	eyebrow,
	title,
	subtitle,
	footer,
}: OgTemplateProps): ReactElement {
	return (
		<div
			style={{
				width: "100%",
				height: "100%",
				display: "flex",
				flexDirection: "column",
				justifyContent: "space-between",
				backgroundColor: DARK_PURPLE,
				padding: "80px",
				color: SLATE_100,
				fontFamily: "sans-serif",
			}}
		>
			<div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
				<div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
					<div
						style={{ width: "48px", height: "4px", backgroundColor: SKY_400 }}
					/>
					<span
						style={{
							fontSize: "24px",
							textTransform: "uppercase",
							letterSpacing: "4px",
							color: SKY_400,
						}}
					>
						{eyebrow}
					</span>
				</div>
				<h1
					style={{
						fontSize: "84px",
						lineHeight: 1.05,
						fontWeight: 700,
						margin: 0,
						maxWidth: "1000px",
					}}
				>
					{title}
				</h1>
				<p
					style={{
						fontSize: "36px",
						lineHeight: 1.3,
						color: SLATE_400,
						margin: 0,
						maxWidth: "1000px",
					}}
				>
					{subtitle}
				</p>
			</div>
			<div
				style={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "flex-end",
					fontSize: "24px",
					color: SLATE_400,
				}}
			>
				<span style={{ display: "flex" }}>julisv.com</span>
				{footer ? <span style={{ display: "flex" }}>{footer}</span> : null}
			</div>
		</div>
	);
}
