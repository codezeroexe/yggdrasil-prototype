import { notFound } from "next/navigation";
import { getTask, tasks } from "@/lib/tasks";
import TaskWorkspace from "./workspace";

export function generateStaticParams() {
  return tasks.map((task) => ({ id: task.id }));
}

export default async function TaskPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const task = getTask(id);
  if (!task) notFound();
  return <TaskWorkspace task={task} />;
}
