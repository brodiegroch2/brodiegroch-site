# OpenAI Custom Actions Approval Workflow Guide

## Understanding the Approval Process

When OpenAI detects that an action is `is_consequential: true` (makes real changes to external systems), it requires user approval before executing. This is a built-in safety feature that cannot be disabled.

### Current Behavior

**Every action that modifies data requires approval:**
- ❌ Cannot be auto-approved
- ❌ No "always allow" setting exists
- ❌ Cannot bypass in OpenAI settings
- ✅ Approval ensures user control over data changes

## What Triggers Approval?

From your debug output:
```json
{
  "is_consequential": true,
  "message": "The requested action requires approval"
}
```

**Actions requiring approval:**
- POST (creating new resources)
- PUT (updating existing resources)  
- DELETE (removing resources)

**Actions NOT requiring approval:**
- GET (reading/viewing data only)
- Info/documentation endpoints

## Best Practices

### 1. Minimize Action Frequency
Instead of multiple small updates, batch operations:
```javascript
// Good: Single batch update
PUT /api/data/courses - Update multiple course fields at once

// Avoid: Multiple individual updates  
PUT /api/data/courses - Update field 1
PUT /api/data/courses - Update field 2  
PUT /api/data/courses - Update field 3
```

### 2. Use Descriptive Operation Names
Make it clear what will happen:
- ✅ "Add SAIT Brightspace to my quick links"
- ❌ "Call createQuickLink"

### 3. Use Read Operations Freely
GET requests don't require approval, so feel free to:
- List courses, deliverables, schedule
- Read documentation
- Check grading scales
- View quick links

### 4. Inform Users About Approval
When prompting users to add/update data, mention:
> "This will require your approval to save the changes"

## Current Implementation Status

### ✅ All Routes Support Consequential Actions
- `POST /api/data/courses` → Requires approval
- `POST /api/data/quick-links` → Requires approval
- `POST /api/data/schedule` → Requires approval
- `PUT /api/data/deliverables` → Requires approval
- `PUT /api/data/courses` → Requires approval
- `DELETE /api/data/*` → Requires approval

### ✅ All Read Operations Don't Require Approval
- `GET /api/data/courses`
- `GET /api/data/quick-links`
- `GET /api/data/schedule`
- `GET /api/news`
- `GET /api/calendar`
- `GET /api/actions`

## Field Name Normalization ✅

Your implementation correctly handles the approval flow:

**Input:** User approves `Site___Name`
**Process:** API normalizes to `Site Name`
**Storage:** Saved as `Site Name` in your data

## Workflow Example

### Adding a Quick Link
1. **User:** "Add SAIT Brightspace to my links"
2. **OpenAI:** Prepares request with `Site___Name`
3. **System:** Prompts user for approval
4. **User:** Approves the action
5. **API:** Normalizes field names
6. **API:** Saves as `Site Name` format
7. **Response:** Success!

## Tips for Users

### Tell Users What to Expect
When they ask to add/update data:
> "I'll need your approval to save this to your site"

### Show Confirmation
After approval, confirm what was done:
> "I've added SAIT Brightspace to your quick links. You can find it in your quick links section."

## Alternative Approaches (Future Considerations)

While there's no way to bypass approval, you could:

### 1. Admin Panel
Create a web interface for bulk management (no AI needed)

### 2. Batch Import
Use JSON/CSV import for multiple items at once

### 3. Pre-population
Seed common items so users need fewer additions

## Summary

✅ **Approval is mandatory** for consequential actions
✅ **No bypass exists** - by design for safety
✅ **GET operations** never require approval
✅ **Field normalization** handles underscore format automatically
✅ **Best practice:** Batch operations, clear descriptions

The approval step ensures users maintain control over their data, which is an important safety feature that protects against unintended changes.

