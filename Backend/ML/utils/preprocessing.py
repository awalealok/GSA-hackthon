import pandas as pd
from pathlib import Path

def preprocess_data(file_path):

    df = pd.read_csv(Path(file_path))

    # Fill Missing Values
    df.fillna(0, inplace=True)

    return df
