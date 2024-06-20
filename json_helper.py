# import json
# import os
# import requests
# import spacy
# from spacy.lang.en.stop_words import STOP_WORDS
# import sys


# # filee = 'Recorded_text.json'
# class json_helper:
#     def save_as_json(self,text, filename):
#         # Check if the file exists
#         if os.path.exists(filename):
#             with open(filename, 'r') as file:
#                 existing_data = json.load(file)
#         else:
#             existing_data = {}

#         # Determine the next available key
#         next_key = "TEXT_"+str(len(existing_data) + 1)

#         # Update existing_data with new text using the next available key
#         existing_data[next_key] = text

#         # Write data to JSON file
#         with open(filename, 'w') as file:
#             json.dump(existing_data, file, indent=4)  # indent for pretty formatting
#         print('Inserted Succesfully')

#     def save_file_names(self,text, filename):
        
#         if os.path.exists(filename):
#             with open(filename, 'r') as file:
#                 existing_data = json.load(file)
                
#         else:
#             existing_data = {}
#         next_key = f"{text}"

#         # Update existing_data with new text using the next available key
#         existing_data[next_key] = f"{text}.mp4"
        
#         with open(filename, 'w') as file:
#             json.dump(existing_data, file, indent=4)  # indent for pretty formatting
#         print('Inserted Succesfully')
        
#     def retreive_last_elem(self):
#         with open('data.json','r') as file:
#             data=json.load(file)
        
#         last_key = list(data.keys())[-1]
#         last_value = data[last_key]
        
#         return json.dump({last_key:last_value})

# class preprocessing:
#     def text_preprocess(self,text):
#         nlp=spacy.load("en_core_web_sm")
#         doc = nlp(text)
#         filtered_tokens = []
#         # verbs=verbs_extraction(text)
            
#         for token in doc:
            
#             if (token.is_stop or token.is_punct or token.like_num) and token.pos_ !='PRON':
#                 continue
#             else:
#                 filtered_tokens.append(token.lemma_.lower())
        
#         return filtered_tokens

# if __name__=='__main__':
#     # print("Entering into python")
#     text=sys.argv[1]
#     # print(text)
#     # json_save=retreive_last_elem()
#     pre=preprocessing()
#     preprocessed_text=pre.text_preprocess(text)
#     # print("Preprocessing completed")
#     if len(preprocessed_text)==1:
#         s_text=preprocessed_text[0]
#     else:
#         s_text='-'.join(preprocessed_text)
#     # print("Returing the  final text")
#         # file_name=s_text+'.mp4'
#     print(s_text)

import spacy
import sys
import logging

# Configure logging
logging.basicConfig(filename='preprocessing.log', level=logging.INFO, format='%(asctime)s:%(levelname)s:%(message)s')

class preprocessing:
    def text_preprocess(self, text):
        logging.info("Loading the spaCy model")
        nlp = spacy.load("en_core_web_sm")
        logging.info("Model loaded successfully")
        doc = nlp(text)
        filtered_tokens = []
        
        logging.info("Starting token filtering")
        for token in doc:
            if (token.is_stop or token.is_punct or token.like_num) and token.pos_ != 'PRON':
                continue
            else:
                filtered_tokens.append(token.lemma_.lower())
        logging.info("Token filtering completed")
        
        return filtered_tokens

if __name__ == '__main__':
    logging.info("Entering into python script")
    text = sys.argv[1]
    logging.info(f"Text received: {text}")
    
    pre = preprocessing()
    preprocessed_text = pre.text_preprocess(text)
    logging.info("Preprocessing completed")
    
    if len(preprocessed_text) == 1:
        s_text = preprocessed_text[0]
    else:
        s_text = '-'.join(preprocessed_text)
    logging.info(f"Final text generated: {s_text}")
    
    print(s_text)
