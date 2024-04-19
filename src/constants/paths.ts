/*
export const JOBS = "jobs"
export const JOB = "job/:id"
export const JOB_CREATE = "job_create"
export const JOB_DELETE = "job_delete/:id"
export const JOB_UPDATE = "job_update/:id"
*/

export const path = {
  job:{
    main:"jobs",
    create:"/new",
    getOneJob:"/:id",
    getJobs:"/",
    updateJob:"/update/:id",
    deleteJob:"/delete/:id",
    filterJob:"/filter/all",
    searchJob:"/search",
  },
  company:{
    main:"companies",
    create:"/new",
    getOneCompany:"/:id",
    getCompanies:"",
    updateCompany:"/update/:id",
    deleteCompany:"/delete/:id",
    filterCompany:"/filter/all",
    searchCompany:"/search/all",
    addAuthorized: '/new-authorized'
  },
  ticket:{
    main:"tickets",
    create:"/new",
    getOneTicket:"/:id",
    getTickets:"/tickets/all",
    crateCompanyTicket:"/crate-company-ticket",
    updateTicket:"/update/:id",
    deleteTicket:"/delete/:id",
    filterTicket:"/filter/all",
  }
}

export const USERS:{
  users: string,
  deletedUsers: string,
  user: string,
  userJob: string,
  userCreate: string,
  userDelete: string,
  userUpdate: string
}={
  users: "",
  deletedUsers: "/deleted-users",
  user: "user/:id",
  userJob: "job/:id",
  userCreate: "create",
  userDelete: "delete/:id",
  userUpdate: "update/:id"

}