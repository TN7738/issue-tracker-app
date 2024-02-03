const issues = [
    {
        id: "1",
        status: "New",
        owner: "Ravan",
        effort: 5,
        created: new Date("2018-08-15"),
        due: undefined,
        title: "Error in console when clicking Add",
    },
    {
        id: "2",
        status: "Assigned",
        owner: "Eddie",
        effort: 14,
        created: new Date("2018-08-16"),
        due: new Date("2018-08-30"),
        title: "Missing bottom border on panel",
    },
    {
        id: "3",
        status: "Assigned",
        owner: "Hally",
        effort: 14,
        created: new Date("2018-08-16"),
        due: new Date("2018-08-30"),
        title: "Missing bottom border on panel",
    },
    {
        id: "4",
        status: "Complete",
        owner: "edger",
        effort: 14,
        created: new Date("2018-08-16"),
        due: new Date("2018-08-30"),
        title: "Missing bottom border on panel",
    },
];

module.exports = issues;
