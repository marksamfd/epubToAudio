import ebooklib
from ebooklib import epub
from bs4 import BeautifulSoup

book = epub.read_epub('rich.epub')
text = list(book.get_items_of_type(ebooklib.ITEM_DOCUMENT))

def TTS(text,chId,parId):
    ! tts 

for chapterId in range(len(text)):
  soup = BeautifulSoup(text[chapterId].get_content(), 'html.parser')
  p = soup.find_all("p")

  for pId in range(len(p)):
    pString = p[pId].text
    pString = pString.replace("“","\"")
    pString = pString.replace("”","\"")
    TTS(pString,chapterId,pId)
    print(pId,pString)  
  print(chapterId)


