# import built-in libraries
import os
import random
import string

# import os to handle environment variables
import os

# organize job id generation in a class
class JobID(object):
    # get all existing job ids
    @staticmethod
    def fetch_existing_job_ids():
        # get TEMP_DIRECTORY_PATH from environment variables
        temp_directory_path = os.getenv("TEMP_DIRECTORY_PATH")

        return [i for i in os.listdir(temp_directory_path) if os.path.isdir(os.path.join(temp_directory_path, i))]

    # create a new job id that doesnt exist
    @staticmethod
    def generate(length=6):
        existing_job_ids = JobID.fetch_existing_job_ids()
        while True:
            generated_job_id = "".join(random.choices(string.ascii_letters + string.digits, k=length))
            if generated_job_id not in existing_job_ids:
                return generated_job_id
