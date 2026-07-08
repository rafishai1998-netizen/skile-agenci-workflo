# Content Strategy Examples

## Files

### minimal-template.json
Bare minimum structure. Use as starting point for any project. Contains one of each required element.

### electrical-contractor-example.json
Complete example for a home service business. Demonstrates:
- 3 audience segments with full psychographic profiles
- 4 content pillars with 20 pieces of content
- 4 interactive tools
- 4 lead magnets
- 4-phase roadmap with 16 deliverables

## Usage

Generate spreadsheet from example:

```bash
python ../scripts/build_content_strategy.py --data electrical-contractor-example.json --output Output.xlsx
```

## Creating Your Own

1. Copy minimal-template.json
2. Replace placeholder values with real data
3. Add more items to each section as needed
4. Run builder script

## JSON Validation

Check your JSON is valid before running:

```bash
python -m json.tool your-file.json > /dev/null && echo "Valid JSON"
```
