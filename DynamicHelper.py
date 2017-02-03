from bs4 import BeautifulSoup as bs

class DynamicHelper:
  def __init__(self):
    self.initiated = True

  @staticmethod
  def GetDynamicContent(mainPath):
    if mainPath == "canvas":
      with open('static/canvas/template.html') as mainCanvas:
        templateSoup = bs(mainCanvas.read())
      templateBlocks = templateSoup.find_all("template")
      
      for block in templateBlocks:
        pageURL = block.get_text()
        with open('static/canvas/'+pageURL) as blockPage:
          pageSoup = bs(blockPage.read())
        
        block.parent.append(pageSoup.find("body"))
        block.parent.find("body").unwrap()
        block.decompose()

        mainHead = templateSoup.find("head")
        mainHead.append(pageSoup.find("head"))
        mainHead.find("head").unwrap()

      data = str(templateSoup.prettify())
      content_type = "text/html"

    else:
      with open('static/bootstrap-home.html', 'r') as myHome:
        data = myHome.read()
      content_type = "text/html"

    return data, content_type