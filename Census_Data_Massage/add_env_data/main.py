import openpyxl

def main():

    spreadsheet= openpyxl.load_workbook("census_selected_data.xlsx")

    mysheet=spreadsheet.active

    mysheet





    spreadsheet.save("census_env_data.xlsx")

    return 1
def if __name__ == '__main__':
    main()