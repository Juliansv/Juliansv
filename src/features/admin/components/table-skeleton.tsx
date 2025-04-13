import { Skeleton } from "@/components/ui/skeleton";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

const TableSkeleton = () => {
	return (
		<div className="rounded-md border mt-10">
			<Table>
				<TableHeader>
					<TableRow className="h-12">
						{Array.from({ length: 5 }).map((_, index) => (
							<TableHead key={index}>
								<Skeleton className="h-4 w-24" />
							</TableHead>
						))}
					</TableRow>
				</TableHeader>
				<TableBody>
					{Array.from({ length: 5 }).map((_, index) => (
						<TableRow
							key={index}
							className="hover:bg-muted/50 cursor-pointer"
						>
							<TableCell className="h-20">
								<Skeleton className="h-4 w-40" />
							</TableCell>
							<TableCell className="h-20">
								<Skeleton className="h-4 w-20" />
							</TableCell>
							<TableCell className="h-20">
								<Skeleton className="h-4 w-20" />
							</TableCell>
							<TableCell className="h-20">
								<Skeleton className="h-4 w-96" />
							</TableCell>
							<TableCell className="h-20">
								<Skeleton className="h-4 w-80" />
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
};

export default TableSkeleton;
