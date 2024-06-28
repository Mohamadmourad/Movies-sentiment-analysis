import requests
from bs4 import BeautifulSoup


def getReviews(link):
    response = requests.get(link)

    soup = BeautifulSoup(response.content, 'lxml')

    posts = soup.find_all('div', class_='text show-more__control')

    reviews = []

    for post in posts:
        reviews.append(post.text)

    return reviews

