#switch to python
import string
import urllib.request
import csv
import os
import random
import time
import re
from selenium import webdriver
def hardinsert(index,a,b):
    str_list = list(a)
    str_list.insert(index, b)
    a_b = ''.join(str_list)
    return a_b
def replace_char(string,char,index):
    string = list(string)
    string[index] = char
    return ''.join(string)
def RGB_to_Hex(tmp):
    rgb = tmp.split(',')#将RGB格式划分开来
    strs = '#'
    for i in rgb:
        num = int(i)#将str转int
        #将R、G、B分别转化为16进制拼接转换并大写
        strs += str(hex(num))[-2:].replace('x','0').upper()
        
    return strs

def id_generator(size=6, chars=string.ascii_uppercase + string.digits):
    return ''.join(random.choice(chars) for _ in range(size))
folderpath = input('请输入文件夹路径: ')
inputpath = input('请输入想要读取的文件顺序以及插入顺序，格式为<文件名>插入文本<文件名>: ')
filenamepath = input("请输入储存文件名的文件名，格式为<文件名>: ")
docpath = input("请输入想要导入的英文文献文件名，格式为<文件名>: ")
docpath=docpath.replace("<","").replace(">","")
filenamepath=filenamepath.replace("<","").replace(">","")
finalfilenamepath = folderpath + "/" + filenamepath + ".txt"
docpath = folderpath + "/" + docpath + ".txt"
filepathlist = []
literatureList = []
filecontent = ""
readfilepath = "/Users/apple/Downloads/CSS文字生成/自动生成随机数据/readfile"
# html tag
substring = ['<div>sub</div>','<a>sub</a>','<h1>sub</h1>','<p>sub</p>','<br>','<title>sub</title>','<table>sub</table>','<h2>sub</h2>','<h3>sub</h3>','<h4>sub</h4>','<h5>sub</h5>','<h6>sub</h6>','<hr>','<b>','<bdi>','<bdo>','<blockquote>','<cite>','<del>sub</dev>','<i>sub</i>','<small>sub</small>','<strong>sub</strong>','<sup>sub</sup>','<u>sub</u>','<form>sub</form>','<input>sub</input>','<textarea>sub</textarea>','<button>sub</button>','<select>sub</select>','<label>sub</label>','<option>sub</option>','<fieldset>sub</fieldset>','<legend>sub</legend>','<datalist>sub</datalist>','<output>sub</output>','<link>sub</link>','<nav>sub</nav>','<ul>sub</ul>','<ol>sub</ol>','<li>sub</li>','<dl>sub</dl>','<dt>sub</dt>','<dd>sub</dd>','<th>sub</th>','<tr>sub</tr>','<td>sub</td>','<col>sub</col>','<thead>sub<thead>']
# css随机样式
stylestring = ['display:block;','background: transparent;','position: relative;','border-radius:0px;','border-color:red;','border-bottom-width:10px;','border-right:12px;','bottom:10px;','color:blue;','column-rule-color:white;','column-rule-width:2px;','column-width:1px;','font-size:4px;','font-size-adjust:3px;','font-weight:0.5px;','height:10px;','left:1px;','margin:1px;','margin-left:2px;','margin-right:3px;','margin-top:1px;','max-height:20px;','max-width:10px;','min-height:2px;','min-width:1px;','overflow:hidden;','padding-bottom:3px;','padding-left:2px;','padding-right:1px;','padding-top:5px;','text-align:center;','visibility:hidden;','text-overflow:hidden;','overflow-x:hidden;','overflow-y:hidden;']
while True:

    x = input('请输入需要的文件数量（必须为整数） ')

    if x.isdigit():

        break

    else:

        print ('请输入整数')
readfilelist = []
if os.path.exists(readfilepath+"/data.txt"):
    with open(readfilepath+"/data.txt", "r") as f:
        data = f.read()  # 读取文件
        readfilelist = data.split('\n')
with open(finalfilenamepath, "r") as f:
    data = f.read()  # 读取文件
    filepathlist = data.split('\n')
filedis = 0
for i in readfilelist:
    thislist = i.split(",")
    if thislist[0] == filenamepath:
        filedis = thislist[1]
startfile=False
filestring=""
composedSentence=""
finallist = []
filecount = 0
for m in inputpath:
    if m == ">":
        thispath = folderpath + "/"+ filestring + ".txt"
        print(thispath)
        with open(thispath, "r") as f:
            data = f.read()  # 读取文件
            datalist = data.split('\n')
            finallist.append(datalist)
            
   
        startfile=False

        filestring=""
    if startfile==True:
        filestring = filestring + m
        print('in')
        print(filestring)
    if m == "<":
        print('i am true')
        startfile=True
    if startfile==False:
        if m != '>':
            composedSentence+=str(m)
 
for j in range(0,int(x)):

    thiscode = inputpath
    for i in range(0,len(finallist)):
        
        randomvalue = random.randint(0,len(finallist[i])-1)
        thiscode = re.sub(u"\\<.*?\\>",finallist[i][randomvalue],thiscode,1)
    
    
    finalurl = "file:///Users/apple/Downloads/CSS%E6%96%87%E5%AD%97%E7%94%9F%E6%88%90/%E6%96%87%E5%AD%97%E7%89%88/%E7%94%B5%E8%84%91%E7%89%88.html"
    driver = webdriver.Chrome(r'./chromedriver')
    
    driver.implicitly_wait(20)
    driver.get(finalurl)
    driver.execute_script("document.getElementById('box').innerHTML = '"+ thiscode +"';")
    button = driver.find_element_by_id('start')
    button.click()

    if filedis < len(filepathlist):
        filedis+=1
        thisfilepath = filepathlist[filedis] + ".txt"
        
    else:
        filedis=0
        thisfilepath = filepathlist[filedis] + ".txt"
    old_file = os.path.join("/Users/apple/Downloads", "index.html")
    while os.path.exists(old_file) == False:
        time.sleep(1)
    new_file = os.path.join("/Users/apple/Downloads", thisfilepath)
    os.rename(old_file,new_file)
    with open(new_file, "r") as f:
        data = f.read()  # 读取文件
        filecontent = data
    with open(docpath, "r") as f:
        thisdata = f.read()  # 读取文件
        literatureList = thisdata.replace("\n","").split(".")
    for count in range(0,int(x)):
        filecontent = data
        
        #开始的tag数量，随机取0到50
        startnumber = random.randint(0,50)
        #结束的tag数量，随机取0到50
        finishnumber = random.randint(0,50)

        idlist = []
        for i in range(0,startnumber):
            stylestart = filecontent.find('<style>')
            stylefinish = filecontent.find('</style>') + len('</style>')
            idlist.append(id_generator(random.randint(0,10)))
            inserttag = substring[random.randint(0,len(substring)-1)]
            thisstring = ""
            #随机插入一到十句英文句子
            for nu in range(0,random.randint(1,10)):
                thisstring += literatureList[random.randint(0,len(literatureList)-1)] + "."
            inserttag = inserttag.replace('sub',thisstring)
            filecontent=hardinsert(stylestart,filecontent,inserttag)
        for j in range(0,finishnumber):
            stylestart = filecontent.find('<style>')
            stylefinish = filecontent.find('</style>') + len('</style>')
            idlist.append(id_generator(random.randint(0,10)))
            inserttag = substring[random.randint(0,len(substring)-1)]
            thisstring = ""
            #随机插入一到十句英文句子
            for nu in range(0,random.randint(1,10)):
                thisstring += literatureList[random.randint(0,len(literatureList)-1)] + "."
            inserttag = inserttag.replace('sub',thisstring)
            filecontent=hardinsert(stylefinish,filecontent,inserttag)
        for i in range(0,len(idlist)):
            stylestart = filecontent.find('<style>')
            stylefinish = filecontent.find('</style>') + len('</style>')
            #每个tag对应的css数量，随机取0到10
            stylenumber = random.randint(0,10)
            for j in range(0,stylenumber):
                insertstyle = stylestring[random.randint(0,len(stylestring)-1)]
                finalstyle = "#" + idlist[i] + " { " + insertstyle + " } "
                filecontent=hardinsert(stylestart+len('<style>'),filecontent,finalstyle)
        startcolor=False
        for m in range(0,len(filecontent)):
            if m>filecontent.find('-webkit-box-shadow'):
                if m < filecontent.find('</style>'):
                    if filecontent[m]=="#":
                        startcolor = True
                    elif startcolor == True:
                        if filecontent[m]==",":
                            startcolor=False
                            randomvalue = random.randint(0,200)
                            randomvalue2 = random.randint(0,200)
                            randomvalue3 = random.randint(0,200)
                            thisrgb = RGB_to_Hex(str(randomvalue)+str(randomvalue2)+str(randomvalue3))
                            for k in range(0,len(thisrgb)):
                     
                                filecontent = replace_char(filecontent,thisrgb[k],m-7+k)
    directory = folderpath + "/test"
    driver.close()
    if not os.path.exists(directory):
        os.makedirs(directory)
    writefilepath = directory + "/" + thisfilepath
    
    with open(writefilepath,"w") as f:
        f.write(filecontent)
        f.close()
with open(readfilepath+"/data.txt","w") as f:
    f.write(filenamepath+","+str(filedis)+"/n")
    f.close()
