import ebooklib
from ebooklib import epub

book = epub.read_epub('rich.epub')
text = list(book.get_items_of_type(ebooklib.ITEM_DOCUMENT))

def fed():
    print("cc")
