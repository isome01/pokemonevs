from tools.task_runner import TaskRunner
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.options import Options
import time


def proc_get_page_resources(proc, attributes, *args, **kwargs):
    """
    Individual task/method used to thread page scraping; passed in as task to TaskRunner class.
    :return: any
        - attributes = {
            page_actions: [
                {
                    element: WebElement,
                    actions: [find, click, send_keys],
                    priority: 1
                }
            ]
        }
    """
    page_index = proc.get_pid()
    actions = attributes.get('elements', [])  # get elements and respective actions in their desired order


class Scraper:
    def __init__(self, url, **kwds):
        if type(kwds) is not dict:
            kwds = {}

        self._wd = None
        chrome_options = Options()

        headless = kwds.get('headless', False)
        executable_path = kwds.get('executable_path', 'C:/Program Files (x86)/chromedriver/chromedriver.exe')
        if headless:
            chrome_options.add_argument('--headless')

        wd = webdriver.Chrome(
            rf'{executable_path}',
            chrome_options=chrome_options
        )

        self._wd = wd
        time.sleep(2)  # if web driver is stalling, give time to stall

        if wd and url:
            self.go_to(url)

    def __del__(self):
        self._wd.close()

    def go_to(self, url):
        self._wd.get(url)

    def wd(self):
        """Returns web-driver reference.
        :return: selenium.webdriver.Chrome()
        """
        return self._wd
