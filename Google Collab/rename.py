import os
import csv

# Define the directory containing the files and the CSV file
directory = r"C:\Peserta"
metadata_file = os.path.join(directory, "metadata.csv")

# Lists to track results
successful_renames = []
failed_renames = []

# Read the mapping from the CSV file
rename_mapping = {}
with open(metadata_file, mode='r', newline='', encoding='utf-8') as file:
    reader = csv.reader(file)
    # Assuming the CSV has two columns: old_name and new_name
    for row in reader:
        if len(row) >= 2:  # Check if the row has at least two columns
            old_name, new_name = row[0].strip(), row[1].strip()
            rename_mapping[old_name] = new_name

# Rename files according to the mapping
for old_name, new_name in rename_mapping.items():
    old_file_path = os.path.join(directory, old_name)
    new_file_path = os.path.join(directory, new_name)

    try:
        # Check if the old file exists
        if os.path.exists(old_file_path):
            # Check if the new file already exists
            if not os.path.exists(new_file_path):
                # Rename the file
                os.rename(old_file_path, new_file_path)
                successful_renames.append(f'Renamed: {old_name} to {new_name}')
            else:
                failed_renames.append(f'Cannot rename: {old_name} to {new_name} (File already exists)')
        else:
            failed_renames.append(f'File not found: {old_name}')
    except Exception as e:
        failed_renames.append(f'Error renaming {old_name} to {new_name}: {str(e)}')

# Print results
print("Successfully Renamed Files:")
for result in successful_renames:
    print(result)

print("\nFailed Renames:")
for error in failed_renames:
    print(error)
