def create_features(df):

    # Example Feature Engineering

    df["Inventory_Value"] = (
        df["Item_MRP"] * df["Item_Visibility"]
    )

    return df
