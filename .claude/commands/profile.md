Display or update the owner preference model.

$ARGUMENTS

## Instructions

### No arguments: display current profile
1. Read memory/owner-preferences.md
2. Read memory/owner-profile.jsonl (count observations)
3. Read memory/decision-log.jsonl (count decisions)
4. Display:
   - Current owner model
   - Confidence level (based on observation count)
   - Recent observations
   - Suggested areas where more data would help

### Arguments = "reset": clear owner data
1. Clear memory/owner-profile.jsonl
2. Clear memory/owner-preferences.md
3. Clear memory/decision-log.jsonl
4. Confirm reset

### Arguments = "synthesize": force re-synthesis
1. Read ALL entries from memory/owner-profile.jsonl
2. Read ALL entries from memory/decision-log.jsonl
3. Regenerate memory/owner-preferences.md
4. Display the updated model

### Arguments = description text: manual preference input
1. Parse the description for preference signals
2. Append to memory/owner-profile.jsonl with type "manual_input"
3. Re-synthesize if 10+ observations since last synthesis
4. Confirm what was recorded
