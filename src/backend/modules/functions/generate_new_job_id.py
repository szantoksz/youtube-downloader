# import built-in libraries
import os
import random
import string

# import app paths
from config import paths

# organize job id generation in a class
class JobID(object):
    # get all existing job ids
    @staticmethod
    def fetch_existing_job_ids():
        return [i for i in os.listdir(paths.TEMP_DIRECTORY_PATH) if os.path.isdir(os.path.join(paths.TEMP_DIRECTORY_PATH, i))]

    # create a new job id that doesnt exist
    @staticmethod
    def generate(length=6):
        existing_job_ids = JobID.fetch_existing_job_ids()
        while True:
            generated_job_id = "".join(random.choices(string.ascii_letters + string.digits, k=length))
            if generated_job_id not in existing_job_ids:
                return generated_job_id