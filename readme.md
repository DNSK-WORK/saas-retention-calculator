Thought for 2 seconds```markdown project="SaaS Retention Calculator" file="README.md"
...
```

2. Install dependencies:

```shellscript
npm install
# or
yarn install
```


3. Run the development server:

```shellscript
npm run dev
# or
yarn dev
```


4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.


## Usage

1. **Enter Your SaaS Metrics**:

1. Monthly Active Users (MAU)
2. New Monthly Signups
3. Monthly Retention Rate
4. Average Revenue Per User (ARPU)
5. Customer Acquisition Cost (CAC)



2. **Optional: Include UX Investment Analysis**:

1. Toggle the switch to include UX investment analysis
2. Enter your planned UX investment amount
3. Estimate retention improvement percentage
4. Set implementation time in months



3. **Calculate and Analyze**:

1. Click "Calculate Retention Impact" to generate results
2. Navigate through the tabs to explore different aspects of the analysis:

1. Base Metrics
2. 12-Month Forecast
3. Improvement Scenario
4. UX ROI (if UX investment is included)








## Project Structure

```plaintext
saas-retention-calculator/
├── app/                    # Next.js app directory
│   ├── calculator/         # Calculator page
│   ├── globals.css         # Global styles
│   └── layout.tsx          # Root layout
├── components/             # React components
│   ├── calculator/         # Calculator components
│   │   ├── tabs/           # Tab components
│   │   ├── calculator-form.tsx
│   │   └── retention-calculator.tsx
│   └── ui/                 # UI components
├── lib/                    # Utility functions and types
│   ├── calculator/         # Calculator logic
│   │   ├── calculations.ts # Calculation functions
│   │   └── types.ts        # TypeScript types
│   └── utils.ts            # Utility functions
└── public/                 # Static assets
```

## Customization

### Styling

The calculator uses Tailwind CSS for styling. You can customize the appearance by modifying:

- `tailwind.config.ts`: Update colors, fonts, and other theme settings
- `app/globals.css`: Modify global styles and CSS variables


### Calculations

To modify the calculation logic:

- `lib/calculator/calculations.ts`: Contains all the calculation functions
- `lib/calculator/types.ts`: Contains TypeScript types and validation schemas


## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request


## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Built by [DNSK WORK](https://dnsk.work/)
- Inspired by SaaS industry retention benchmarks and UX ROI research


```plaintext

```
