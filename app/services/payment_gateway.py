def extract_session_token(payload: dict) -> str:
    if not payload or not isinstance(payload, dict):
        return ""
    session = payload.get("session")
    if not session or not isinstance(session, dict):
        return ""
    return session.get("token", "")
