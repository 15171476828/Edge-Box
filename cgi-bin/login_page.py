def response_login(private_data, MsgID):
    if private_data['user'] == 'iiot' and private_data['password'] == '123456':
        return {'MsgID':MsgID, 'Result': 0, 'data':{'pass':1}}
    else:
        return {'MsgID':MsgID, 'Result': 0, 'data':{'pass':-2}}
