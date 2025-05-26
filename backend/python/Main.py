from Database import connect_to_DB,execute_sql
from threading import Lock
from friends import collect_people_data, get_filtered_people
from fastapi import FastAPI, WebSocket
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=['http://localhost:3000'],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
connection = connect_to_DB()
people_data:list = []
people_lock = Lock()

def safe_collect_people_data():
    global people_data
    with people_lock:
        people_data = collect_people_data(connection,execute_sql)
        print(people_data)

safe_collect_people_data()

@app.websocket('/people')
async def get_all_people(websocket: WebSocket):
    await websocket.accept()
    while True:
        data = await websocket.receive_text()
        print(data)
        response = get_filtered_people(people_data,data)
        await websocket.send_json(response)


# t = Timer(100.0, safe_update_data)
# t.start() 


if __name__ == "__main__":
    import uvicorn
    if connection is None or not connection.is_connected():
        print("Database connection failed")
        exit()
    uvicorn.run(app, host="127.0.0.1", port=9000)