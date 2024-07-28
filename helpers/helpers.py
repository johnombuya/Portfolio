import os

def fetch_file_names(dir_path):
    """
    Returns directory's file paths.

    Parameters:
        dir_path (str): Directory path.

    Return:
        dir_file_paths (list): The directory's file paths
    """
    dir_entities_paths = os.listdir(dir_path)
    # dir_file_paths = [entity_path for entity_path in dir_entities_paths if os.path.isfile(entity_path)]
    # return dir_file_paths
    return dir_entities_paths


