export const JOBS = "jobs"
export const JOB = "job/:id"
export const JOB_CREATE = "job_create"
export const JOB_DELETE = "job_delete/:id"
export const JOB_UPDATE = "job_update/:id"

export const USERS:{
  users: string,
  user: string,
  userJob: string,
  userCreate: string,
  userDelete: string,
  userUpdate: string
}={
  users: "users",
  user: "user/:id",
  userJob: "job/:id",
  userCreate: "create",
  userDelete: "delete/:id",
  userUpdate: "update/:id"

}