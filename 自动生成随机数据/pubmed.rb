# This file should contain all the record creation needed to seed the database with its default values.
require 'nokogiri'
require 'pg'
require 'date'


xmlFilePath = ENV['PUBMED_ARCHIVE']
filenumber = ENV['filenumber']


# Fetch and parse HTML document
@doc = Nokogiri::XML(File.open(xmlFilePath))
puts "### Search for nodes by css"
@articles = @doc.xpath("//PubmedArticle")
@articles.each{|pubmedArticle|
    # creating empty array to store the IDs of all the authors to add to the linker table later
    titles = []
    abstracts =[]
    
    # ARTICLE DATA
    articleTitle = (pubmedArticle.css('MedlineCitation Article ArticleTitle').text).strip
    articleTitle = articleTitle.to_s.gsub(/'/,"''")
    articleAbstract = pubmedArticle.css('MedlineCitation Article Abstract').text
    articleAbstract = articleAbstract.to_s.gsub(/'/,"''")
    titles.append(articleTitle)
    abstract.append(articleAbstract)
    
}
aFile = File.new(filenumber + ".txt", "r+")
if aFile
   for m in 0..articleTitle.length() do
       aFile.syswrite(articleTitle)
       aFile.syswrite(articleAbstract)
   end
else
   puts "Unable to open file!"
end
