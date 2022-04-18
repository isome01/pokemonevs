from enum import Enum


class DBType(Enum):
    """Simple "driver type" enum (e.g.: DBDriverType.Domo, etc...)"""
    DOMO = 1,
    BIGQUERY = 2,
    MARKETMAN = 3,
    POSTGRES = 4,
    AWS = 5


class Comparators(Enum):
    IS_EQUAL_TO = 'IS_EQUAL_TO',
    IS_NOT_EQUAL_TO = 'IS_NOT_EQUAL_TO',
    IS_LESS_THAN = 'IS_LESS_THAN',
    IS_LESS_THAN_OR_EQUAL_TO = "IS_LESS_THAN_OR_EQUAL_TO",
    IS_GREATER_THAN = "IS_GREATER_THAN",
    IS_GREATER_THAN_OR_EQUAL_TO = "IS_GREATER_THAN_OR_EQUAL_TO",
    IS_BETWEEN = 'IS_BETWEEN',
    IS_LIKE = 'IS_LIKE',
    IN = 'IN',
    NOT_IN = 'NOT_IN',
    IS_NOT = 'IS_NOT'


class SQLOperation(Enum):
    """CRUD dynamic"""
    CREATE = 1,
    READ = 2,
    UPDATE = 3,
    DELETE = 4


class RequestType(Enum):
    """Adhoc Request Type"""
    GET = 1,
    POST = 2,
    PUT = 3,
    PATCH = 4,
    DELETE = 5
