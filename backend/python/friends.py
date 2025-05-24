
def collect_people_data(connection, execute_sql):
    return [x[0] for x in execute_sql(connection,'select username from users;')]

def get_filtered_people(people:list, user_text:str):
    return filter(lambda x: x[:len(user_text)] == user_text, people)