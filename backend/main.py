import sys
import json
from nltk.sentiment.vader import SentimentIntensityAnalyzer

from scrapingReview import getReviews

sia = SentimentIntensityAnalyzer()

input_data = sys.stdin.read()

if input_data:
    try:
        data = json.loads(input_data)
        url = data.get('url', '')
        comments = getReviews(url)

        # Perform sentiment analysis
        count = 0
        sentiment = 0
        positive = 0
        negative = 0
        for comment in comments:
            count +=1
            scores = sia.polarity_scores(comment)
            sentiment += scores['compound']
            if scores['compound'] > 0:
                positive += 1
            elif scores['compound'] < 0:
                negative += 1
        
        sentiment = sentiment / count

        print(json.dumps({
            'sentiment': sentiment,
            'positive': positive,
            'negative': negative,
            'count': count
        }))

    except Exception as e:
        print(json.dumps({'error': str(e)}))
else:
    print(json.dumps({'error': 'No input data received'}))
