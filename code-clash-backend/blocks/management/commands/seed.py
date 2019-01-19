from django.core.management.base import BaseCommand
from blocks.models import Block

class Command(BaseCommand):
    help = "seed database for testing and development."

    def add_arguments(self, parser):
        parser.add_argument('--mode', type=str, help="Mode")

    def handle(self, *args, **options):
        self.stdout.write('seeding data...')
        run_seed(self, options['mode'])
        self.stdout.write('done.')


def clear_data():
    '''
    Clears the table
    '''
    Block.objects.all().delete()


def create_blocks(inCode):
    '''
    Generates a block with the specified code
    '''
    block = Block(
        voteCount = 0,
        winCount = 0,
        code = inCode,
        winRate = 0
    )
    block.save()

def run_seed(self, mode):
    """ Seed database based on mode

    :param mode: refresh / clear 
    :return:
    """
    # Clear data from tables
    clear_data()

    # Creating 15 addresses
    for i in range(15):
        create_blocks(i)