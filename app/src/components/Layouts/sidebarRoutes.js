import {
    faBriefcase,
    faBuilding,
    faCalendar,
    faCalendarDay,
    faClock,
    faCommentDollar,
    faDoorOpen,
    faFolderPlus,
    faHandHoldingUsd,
    faMoon,
    faNetworkWired,
    faUserEdit,
} from "@fortawesome/free-solid-svg-icons";

const companyRoutes = [
    {
        title: "Organization",
        items: [
            { name: "Company", link: "/company/details", icon: faBuilding },
            { name: "Offices", link: "/company/offices", icon: faBriefcase },
            {
                name: "Signatories",
                link: "/company/signatories",
                icon: faUserEdit,
            },
            {
                name: "Disbursement",
                link: "/disbursement",
                icon: faHandHoldingUsd,
            },
            {
                name: "Structures",
                link: "#",
                icon: faNetworkWired,
                items: [
                    {
                        name: "Departments",
                        link: "/departments",
                    },
                    {
                        name: "Positions",
                        link: "/positions",
                    },
                    { name: "Ranks", link: "/ranks" },
                    {
                        name: "Employment Type",
                        link: "/employement-type",
                    },
                ],
            },
            { name: "Projects", link: "/projects", icon: faFolderPlus },
            {
                name: "Cost Center",
                link: "/cost-center",
                icon: faCommentDollar,
            },
        ],
    },
    {
        title: "Time",
        items: [
            {
                name: "Leaves",
                link: "#",
                icon: faDoorOpen,
                items: [
                    { name: "Leave Types", link: "#" },
                    { name: "Leave Entitlement", link: "#" },
                ],
            },
            {
                name: "Schedules",
                link: "#",
                icon: faCalendar,
                items: [
                    { name: "Departments", link: "#" },
                    { name: "Positions", link: "#" },
                ],
            },
            {
                name: "Time Entry",
                link: "#",
                icon: faClock,
                items: [
                    { name: "Departments", link: "#" },
                    { name: "Positions", link: "#" },
                ],
            },
            { name: "Holidays", link: "#", icon: faCalendarDay },
            { name: "Night Shift", link: "#", icon: faMoon },
        ],
    },
    {
        title: "Payroll",
        items: [
            {
                name: "Payroll Group",
                link: "#",
                items: [
                    { name: "Departments", link: "#" },
                    { name: "Positions", link: "#" },
                ],
            },
            {
                name: "Payslip",
                link: "#",
                items: [
                    { name: "Departments", link: "#" },
                    { name: "Positions", link: "#" },
                ],
            },
            {
                name: "Other Income",
                link: "#",
                items: [
                    { name: "Departments", link: "#" },
                    { name: "Positions", link: "#" },
                ],
            },
            { name: "Loan Types", link: "#" },
            { name: "Contributions", link: "#" },
            { name: "Deductions", link: "#" },
            { name: "Day/Hour Rates", link: "/company/rates" },
            { name: "Annualization", link: "#" },
        ],
    },
    {
        title: "Expense",
        icon: faClock,
        items: [{ name: "Expense Types", link: "#" }],
    },
];

export { companyRoutes };
