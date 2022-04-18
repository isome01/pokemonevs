from datetime import datetime
from geopy.distance import distance
from io import StringIO
import re
import csv


def wrap_double_quotes(text=''):
    return f'"{text}"'


def wrap_single_quotes(text=''):
    return f"'{text}'"


def match_values_to_column_sequence(values, columns):
    """ Returns list of values in the order their corresponding columns
    :param values: dict() -> values to match
    :param columns: list() -> the columns that the values should be matched to
    :return: list()
    """
    seq = [values.get(c, None) for c in columns]
    return seq


def build_statement_from_list(listed_items, final_clause=' and then '):
    """ Builds a sentence from an input list
    :param listed_items: some list that contains values
    :param final_clause: some list that contains values
    :return: str
    """
    statement = ''
    if listed_items and type(listed_items) is list:
        l_items_total = len(listed_items)
        for item in listed_items:
            statement += str(item) + final_clause if listed_items - (listed_items.index(item) + 1) != 1 else \
                ', ' if (listed_items.index(item) + 1) < l_items_total else ''

    return statement


def format_time_stamp(time_format='%m/%d/%Y %H:%M:%S'):
    """ This function returns a timestamp (string) based off of current time """
    try:
        tup = datetime.now().timetuple()
        dm = {tup.index(v): v for v in tup}
        date_map_string = f'{dm[1]}/{dm[2]}/{dm[0]} {dm[3]}:{dm[4]}:{dm[5]}'
        cur_time = datetime.strptime(date_map_string, time_format)
        return cur_time.strftime('%A, %d. %B %Y %H:%M:%S %p')
    except Exception as e:
        print(f'logging error: {e}')
        return ''


def format_date_to_utc_string(d):
    """NOTE: Needs to be implemented from MM data connector ECMA5"""
    return ''


def format_time_string(date=None, _format=''):
    """Factory for generating a string from format
    :param date:
    :param _format:
    :return:
    """
    time_string = ''
    tup = datetime.now().timetuple()
    dm = {tup.index(v): v for v in tup}
    if _format == 'ss':
        time_string = format_date_to_utc_string(date)
    elif _format == 'mm_sales_now':
        date_map_string = f'{dm[1]}/{dm[2]}/{dm[0]} {dm[3]}:{dm[4]}:{dm[5]}'
        cur_time = datetime.strptime(date_map_string, '%m/%d/%Y %H:%M:%S')
        time_string = cur_time.strftime('%Y/%m/%d %H:%M:%S')
    elif _format == 'mm_sales_start':
        date_map_string = f'{dm[1]}/{dm[2]}/{dm[0]} {dm[3]}:{dm[4]}:{dm[5]}'
        cur_time = datetime.strptime(date_map_string, '%m/%d/%Y %H:%M:%S')
        time_string = cur_time.strftime('%Y/%m/%d') + ' 00:00:00'
    elif _format == 'mm_sales_end':
        date_map_string = f'{dm[1]}/{dm[2]}/{dm[0]} {dm[3]}:{dm[4]}:{dm[5]}'
        cur_time = datetime.strptime(date_map_string, '%m/%d/%Y %H:%M:%S')
        time_string = cur_time.strftime('%Y/%m/%d') + ' 23:59:59'
    else:
        time_string = format_time_stamp('%m/%d/%Y %H:%M:%S')

    return time_string


def convert_csv_string_to_json(csv_string, limit=0):
    """
    this function converts csv string to json.
    :param csv_string: String
    :param limit: int
    :return: Object
    """
    data_collection = []
    try:
        meta_data = csv_string.split('\n', 1)
        csv_headers = meta_data[0].split(',')
        header_count = len(csv_headers)
        # turn data into file object
        csv_data = csv.reader(StringIO(meta_data[1]), delimiter=',')

        for row in csv_data:
            data_count = len(row)
            # iterate each piece of data and group them by header count
            data_obj = {}
            for index in range(0, header_count):
                # clean up any misc. stuff
                key = format_string_to_clean(csv_headers[index])
                val = format_string_to_clean(row[index])
                if key:
                    data_obj[key] = val
            data_collection.append(data_obj)

        # apply object return limit
        # data_collection = [data_collection[i] for i in range(0, limit)]
        return data_collection

    except Exception as e:
        print(f'Unable to convert string to object.\nError:{e}')
        return [{'message': e}]


def create_name_dict_from_records(records, indexes=None):

    name_dict = {}
    indexes = [0, 1] if (not indexes or type(indexes) is not list) else indexes
    for record in records:
        keys = [*record.keys()]

        if not len(keys):
            # if no keys are somehow found then just continue
            continue

        # cleanup key before hashing
        key = format_string_to_clean(record[keys[indexes[0]]])
        # clean up value before hashing
        value = format_string_to_clean(record[keys[indexes[1]]])
        if key:
            name_dict[key] = value

    return name_dict


def format_string_to_clean(text):
    """
    :param text: text to be "cleansed" of uncanny values (like \n)
    :return: str
    """
    text = re.sub("(\n)", "", text)
    return text


def calculate_distance(src, dst):
    """This function will calculate distance with geo-location coordinates.
        reference for help: https://janakiev.com/blog/gps-points-distance-python/
        mathematical formula: a=hav(Δφ)+cos(φ1)⋅cos(φ2)⋅hav(Δλ)
    """
    geo_coords_distance = -1
    # print(f'source: {src}\n destination: {dst}')
    if ('lat' in src and 'lng' in src) and ('lat' in dst and 'lng' in dst):
        source = (src['lat'], src['lng'])
        destination = (dst['lat'], dst['lng'])
        geo_coords_distance = distance(source, destination).miles

    return geo_coords_distance
