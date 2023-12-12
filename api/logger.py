import logging
import time

logger = logging.getLogger(__file__)
logger.setLevel(logging.INFO)
formatter = logging.Formatter('%(levelname)s:%(asctime)s: %(message)s', datefmt='%Y-%d-%m %H:%M:%S')

file_log = logging.FileHandler(f'{time.strftime("%Y%m%d")}.log')
file_log.setLevel(logging.INFO)
file_log.setFormatter(formatter)

streaming_log = logging.StreamHandler()
streaming_log.setLevel(logging.ERROR)
streaming_log.setFormatter(formatter)

logger.addHandler(file_log)
logger.addHandler(streaming_log)
