def calculate_discount(total_rebate: float, item_count: int) -> float:
    if item_count <= 0:
        return 0.0
    return total_rebate / item_count
