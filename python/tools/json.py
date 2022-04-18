import json
from enum import Enum


class ResType(Enum):
    ERROR = 0,
    SUCCESS = 0


def get_default_lambda_headers():
    """Simple dict of encapsulated default headers syntax to send via
       lambda response."""
    return {
        'statusCode': 200
    }


def get_error_response(error, status, code):
    """A formatted error response."""
    return {
        'statusCode': f'{status}',
        'body': json.dumps(
            {
                'errors': {
                    'message': f'{error}'
                },
                'code': f'{code}'
            },
            indent=2
        )
    }


def get_success_response(data, meta=None):
    """A formatted success response."""
    if not meta or type(meta) is not dict:
        meta = {}
    if not len(data):
        data = []
    return {
        **get_default_lambda_headers(),
        'body': json.dumps(
            {
                'meta': meta,
                'data': data,
            },
            sort_keys=True,
            indent=2
        )
    }
