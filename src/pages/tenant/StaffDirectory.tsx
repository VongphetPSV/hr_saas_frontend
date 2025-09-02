import React, { useState, useMemo } from "react";
import {
  Search,
  Users,
  Phone,
  Mail,
  MoreVertical,
  Plus,
  ChevronDown,
  Filter,
  Grid3X3,
  List,
} from "lucide-react";

interface Employee {
  id: string;
  name: string;
  initials: string;
  position: string;
  department: string;
  status: "Active" | "Remote" | "On Leave";
  joinDate: string;
  email: string;
  phone: string;
  avatar?: string;
}

const StaffDirectory: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [departmentFilter, setDepartmentFilter] = useState("All Departments");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Sample employee data matching Figma design
  const employees: Employee[] = [
    {
      id: "1",
      name: "Sarah Chen",
      initials: "SC",
      position: "Marketing Executive",
      department: "Marketing",
      status: "Active",
      joinDate: "15/03/2023",
      email: "sarah.chen@company.com",
      phone: "+1234567890",
    },
    {
      id: "2",
      name: "Ahmad Rahman",
      initials: "AR",
      position: "Software Engineer",
      department: "Engineering",
      status: "Remote",
      joinDate: "22/08/2022",
      email: "ahmad.rahman@company.com",
      phone: "+1234567891",
    },
    {
      id: "3",
      name: "Lisa Wong",
      initials: "LW",
      position: "HR Specialist",
      department: "Human Resources",
      status: "Active",
      joinDate: "10/11/2021",
      email: "lisa.wong@company.com",
      phone: "+1234567892",
    },
    {
      id: "4",
      name: "David Tan",
      initials: "DT",
      position: "Project Manager",
      department: "Operations",
      status: "On Leave",
      joinDate: "18/05/2020",
      email: "david.tan@company.com",
      phone: "+1234567893",
    },
    {
      id: "5",
      name: "Priya Sharma",
      initials: "PS",
      position: "UX Designer",
      department: "Design",
      status: "Active",
      joinDate: "08/01/2023",
      email: "priya.sharma@company.com",
      phone: "+1234567894",
    },
    {
      id: "6",
      name: "James Liu",
      initials: "JL",
      position: "Sales Manager",
      department: "Sales",
      status: "Active",
      joinDate: "03/12/2019",
      email: "james.liu@company.com",
      phone: "+1234567895",
    },
  ];

  // Filter employees based on search and filters
  const filteredEmployees = useMemo(() => {
    return employees.filter((employee) => {
      const matchesSearch =
        employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        employee.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
        employee.department.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        statusFilter === "All Status" || employee.status === statusFilter;

      const matchesDepartment =
        departmentFilter === "All Departments" ||
        employee.department === departmentFilter;

      return matchesSearch && matchesStatus && matchesDepartment;
    });
  }, [searchQuery, statusFilter, departmentFilter]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-700";
      case "Remote":
        return "bg-blue-100 text-blue-700";
      case "On Leave":
        return "bg-orange-100 text-orange-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <div className="border-b border-gray-200">
        <div className="px-6 py-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-[21px] font-semibold text-gray-900">
                Staff Directory
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                {employees.length} employees
              </p>
            </div>
            <div className="flex items-center space-x-3">
              {/* View Mode Toggle */}
              <div className="flex items-center border border-gray-200 rounded-lg">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 ${viewMode === "grid" ? "bg-gray-100" : ""}`}
                >
                  <Grid3X3 size={14} />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 ${viewMode === "list" ? "bg-gray-100" : ""}`}
                >
                  <List size={14} />
                </button>
              </div>
              {/* Add Employee Button */}
              <button className="flex items-center space-x-2 px-4 py-2 bg-gray-900 text-white text-xs rounded-lg hover:bg-gray-800">
                <Plus size={14} />
                <span>Add Employee</span>
              </button>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex items-center space-x-3">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={14}
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search employees..."
                className="w-full pl-9 pr-4 py-2 bg-gray-100 text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Status Filter */}
            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="appearance-none px-4 py-2 pr-8 bg-gray-100 text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option>All Status</option>
                <option>Active</option>
                <option>Remote</option>
                <option>On Leave</option>
              </select>
              <ChevronDown
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
                size={14}
              />
            </div>

            {/* Department Filter */}
            <div className="relative">
              <select
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
                className="appearance-none px-4 py-2 pr-8 bg-gray-100 text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option>All Departments</option>
                <option>Marketing</option>
                <option>Engineering</option>
                <option>Human Resources</option>
                <option>Operations</option>
                <option>Design</option>
                <option>Sales</option>
              </select>
              <ChevronDown
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
                size={14}
              />
            </div>

            {/* More Filters Button */}
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-200 text-sm rounded-lg hover:bg-gray-50">
              <Filter size={14} />
              <span>More Filters</span>
            </button>
          </div>
        </div>
      </div>

      {/* Employee Cards Grid */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredEmployees.map((employee) => (
            <div
              key={employee.id}
              className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-4">
                  {/* Avatar */}
                  <div className="w-14 h-14 bg-gray-900 rounded-full flex items-center justify-center text-white text-sm font-medium">
                    {employee.initials}
                  </div>

                  {/* Employee Info */}
                  <div>
                    <h3 className="text-[15.8px] font-semibold text-gray-900">
                      {employee.name}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {employee.position}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {employee.department}
                    </p>
                  </div>
                </div>

                {/* Status and Menu */}
                <div className="flex items-center space-x-2">
                  <span
                    className={`px-2 py-1 text-[10.5px] font-medium rounded-md ${getStatusColor(
                      employee.status
                    )}`}
                  >
                    {employee.status}
                  </span>
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <MoreVertical size={14} className="text-gray-400" />
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-3 mt-4">
                <button className="flex items-center space-x-2 px-3 py-1.5 text-xs border border-gray-200 rounded-lg hover:bg-gray-50">
                  <Phone size={14} />
                  <span>Call</span>
                </button>
                <button className="flex items-center space-x-2 px-3 py-1.5 text-xs border border-gray-200 rounded-lg hover:bg-gray-50">
                  <Mail size={14} />
                  <span>Email</span>
                </button>
              </div>

              {/* Join Date */}
              <p className="text-[10.5px] text-gray-500 mt-4">
                Joined: {employee.joinDate}
              </p>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredEmployees.length === 0 && (
          <div className="text-center py-12">
            <Users className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <p className="text-gray-500">
              No employees found matching your criteria
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setStatusFilter("All Status");
                setDepartmentFilter("All Departments");
              }}
              className="mt-4 text-sm text-blue-600 hover:text-blue-700"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default StaffDirectory;
