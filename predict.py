from ultralytics import YOLOv10 
import sys

model=YOLOv10("best.pt")


if __name__=="__main__":
    names = [
    "A", "B", "C", "CH", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", 
    "W", "X", "Y", "Z", "additional", "alcohol", "allergy", "bacon", "bag", "barbecue", "bill", "biscuit", "bitter", 
    "bread", "burger", "bye", "cake", "cash", "cheese", "chicken", "coke", "cold", "cost", "coupon", "credit card", 
    "cup", "dessert", "drink", "drive", "eat", "eggs", "enjoy", "fork", "french fries", "fresh", "hello", "hot", 
    "icecream", "ingredients", "juicy", "ketchup", "lactose", "lettuce", "lid", "manager", "menu", "milk", "mustard", 
    "napkin", "no", "order", "pepper", "pickle", "pizza", "please", "ready", "receipt", "refill", "repeat", "safe", 
    "salt", "sandwich", "sauce", "small", "soda", "sorry", "spicy", "spoon", "straw", "sugar", "sweet", "thank-you", 
    "tissues", "tomato", "total", "urgent", "vegetables", "wait", "warm", "water", "what", "yoghurt", "your"
    ]
    index=[]
    # model=YOLOv10("best.pt")
    
    cap=cv2.VideoCapture(sys.argv[1])
    while(True):
        check,frame=cap.read()
        
        if not check:
            break
        results=model.predict(frame)
        for result in results:
            for r in result:
                if r['confidence'] > 0.3:
                    class_id = r['class']
                    index.append(names[class_id])
                    
    cap.relase()
    print(index)
    
    