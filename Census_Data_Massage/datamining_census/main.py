import openpyxl

def open_spreadsheet(filename):
    return openpyxl.load_workbook(filename)


def set_data_index(spreadsheet):


def get_city_names(spreadsheet):

def get_city_data(spreadsheet):

def combine_names_with_data(city_names, city_data):

def generate_rankings(all_cities):

def write_new_spreadsheet(combined_data):





class city_full:
    data_index={}
    def __init__(self, name, data_array):
        self.name=name
        self.data_array=data_array

    def set_data_index(self, data_index_dict):
        data_index=data_index_dict






def main():

    workbook=open_spreadsheet(name)


def if __name__ == '__main__':
    main()