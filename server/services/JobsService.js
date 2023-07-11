import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class JobsService {
    async getJobs() {
        const jobs = await dbContext.Jobs.find()

        return jobs
    }

    async getJobById(jobId) {
        const job = await dbContext.Jobs.findById(jobId)

        if (!job) {
            throw new BadRequest(`${jobId} is an invalid ID or does not exist.`)
        }

        return job
    }

    async createJob(jobData) {
        const job = await dbContext.Jobs.create(jobData)

        return job
    }

    async removeJob(jobId, userId) {
        const jobToDelete = await this.getJobById(jobId)

        if (jobToDelete.creatorId != userId) {
            throw new Forbidden(`This item does NOT match its user's ID.`)
        }

        await jobToDelete.remove()
    }

    async updateJob(jobId, jobData, userId) {
        const originalJob = await this.getJobById(jobId)

        if (originalJob.creatorId != userId) {
            throw new Forbidden(`This item does NOT match its user's ID.`)
        }

        originalJob.title = jobData.title || originalJob.title

        originalJob.wage = jobData.wage || originalJob.wage

        originalJob.salary = jobData.salary != null ? jobData.salary : originalJob.salary

        originalJob.description = jobData.description || originalJob.description

        await originalJob.save()

        return originalJob
    }
}

export const jobsService = new JobsService