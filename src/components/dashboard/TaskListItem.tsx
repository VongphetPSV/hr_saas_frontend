import React from 'react';

interface TaskListItemProps {
  title: string;
  dueDate: Date;
  priority: 'High' | 'Medium' | 'Low';
  completed?: boolean;
  onToggle?: () => void;
}

const priorityColors = {
  High: 'bg-red-100 text-red-800',
  Medium: 'bg-yellow-100 text-yellow-800',
  Low: 'bg-blue-100 text-blue-800'
};

const TaskListItem: React.FC<TaskListItemProps> = ({
  title,
  dueDate,
  priority,
  completed = false,
  onToggle
}) => {
  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-200 last:border-0">
      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          checked={completed}
          onChange={onToggle}
          className="h-4 w-4 text-purple-600 rounded border-gray-300 focus:ring-purple-500"
        />
        <div>
          <h4 className={`text-sm font-medium ${completed ? 'text-gray-400 line-through' : 'text-gray-900'}`}>
            {title}
          </h4>
          <p className="text-xs text-gray-500">
            Due {dueDate.toLocaleDateString()}
          </p>
        </div>
      </div>
      <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${priorityColors[priority]}`}>
        {priority}
      </span>
    </div>
  );
};

export default TaskListItem;
