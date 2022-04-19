from scraper.app import Scraper
import time
import os
import csv
import json

base_url = 'https://pokemondb.net'
output_file = f'{os.getcwd()}/data/poke_evs.csv'
output_json = f'{os.getcwd()}/data/poke_evs.json'


def proc_get_evs_from_page(proc, attributes, *args, **kwargs):
    pid = proc.get_id()
    page_iter = attributes['tasks_count']
    get_list_orders = attributes['api_call']
    data_key = attributes['data_key']
    passed_params = attributes['params']


if __name__ == '__main__':

    # go to base url
    check_needed = False
    s = Scraper(base_url, **{'headless': True})

    # check if privacy control modal is present
    modal_present = s.wd().find_element_by_css_selector('.modal')
    if modal_present:
        check_needed = True
        ok_btn = s.wd().find_element_by_css_selector('.btn')
        if ok_btn:
            ok_btn.click()
            check_needed = False
            time.sleep(.5)

    # Begin traversal once check is done: privacy-control check must be had before scraping
    if check_needed:
        print(f'Unable to proceed with scraping.\n'
              f'Check Needed: {check_needed}\nModal Present: {modal_present}\n')
    else:
        s.go_to(base_url + '/pokedex/bulbasaur')  # go to index url

        with open(output_file, 'w', encoding='utf-8') as output:
            # open up a file to input the data
            output.write('name,ev_yield,sprite_img,link,dex_no')
            count = 1
            while 905 >= count:
                # fields to retrieve
                link = s.wd().current_url
                next_page = s.wd().find_element_by_css_selector('.entity-nav-next')
                ev_yield = s.wd().find_elements_by_css_selector('.vitals-table > tbody > tr:nth-child(1) > td')[1].text.replace(',', '/')
                name = link.split('/').pop()
                name = name[0].upper() + name[1:]
                sprite_img = f'https://img.pokemondb.net/sprites/sword-shield/icon/' \
                             f'{link.split("/").pop()}.png'
                output.write(f'\n{name},{ev_yield},{sprite_img},{link},{count}')

                count += 1
                next_page.click()

            output.close()

        # Clean data and write to json file
        with open('./data/poke_evs.csv', 'r') as csvfile:
            reader = csv.reader(csvfile, delimiter=',')

            data = []
            headers = []
            for row in reader:
                obj = {}
                if not headers:
                    headers = row
                else:
                    for i in range(len(headers)):
                        if headers[i] == 'ev_yield':
                            obj[headers[i]] = []
                            ev_yields = row[i].split('/')  # split if multiple ev yields
                            for y in ev_yields:
                                # trim any leading spaces
                                if y[0] == ' ':
                                    y = y[1:]
                                obj[headers[i]].append(y)
                        else:
                            obj[headers[i]] = row[i]
                    data.append(obj)

            with open(output_json, 'w') as json_file:
                json.dump(data, json_file)
