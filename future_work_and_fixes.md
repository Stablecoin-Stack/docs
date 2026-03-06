
# Fixes
1. The stack is not fully comformant. It must be

2. We are sending the merchant's generated order reference to the contract. That is incorrect, we should send the glema Id instead.

3. Redefinition an repurpose of the `ref` field| Currently holds two values that are not directly related. That design choice has no real benefit.| Each value must be placed in their own field.| That change does not impact the payments or the architecture in general, however, it impacts the implement and reconciliation logic.

4. 