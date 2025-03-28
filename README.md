# SaaS Retention Calculator

An interactive tool for modeling SaaS retention, forecasting growth, and evaluating the ROI of UX investments.

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/saas-retention-calculator.git
cd saas-retention-calculator
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Run the Development Server

```bash
npm run dev
# or
yarn dev
```

### 4. Open the App

Visit [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## Usage

### 1. Enter Your SaaS Metrics

- **Monthly Active Users (MAU)**
- **New Monthly Signups**
- **Monthly Retention Rate**
- **Average Revenue Per User (ARPU)**
- **Customer Acquisition Cost (CAC)**

### 2. *Optional:* Include UX Investment Analysis

- Toggle the UX investment switch
- Input your planned UX investment amount
- Estimate retention improvement percentage
- Set the implementation timeline in months

### 3. Calculate and Analyze

- Click **"Calculate Retention Impact"**
- Explore the tabs to view different aspects of the analysis:

  - **Base Metrics**
  - **12-Month Forecast**
  - **Improvement Scenario**
  - **UX ROI** (if UX investment is included)

---

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
│   └── ui/                 # Shared UI components
├── lib/                    # Logic and utilities
│   ├── calculator/         # Calculation logic
│   │   ├── calculations.ts
│   │   └── types.ts
│   └── utils.ts            # Helper functions
└── public/                 # Static assets
```

---

## Customization

### Styling

The calculator uses [Tailwind CSS](https://tailwindcss.com/). To customize styles:

- Modify `tailwind.config.ts` to adjust colors, fonts, and theme settings
- Update `app/globals.css` for global styling or custom variables

### Calculations

To modify the logic behind the metrics:

- Edit `lib/calculator/calculations.ts` for custom formulas
- Update `lib/calculator/types.ts` to adjust TypeScript types or validation schemas

---

## Contributing

We welcome contributions!

1. Fork the repository
2. Create your feature branch:  
   `git checkout -b feature/amazing-feature`
3. Commit your changes:  
   `git commit -m 'Add some amazing feature'`
4. Push to the branch:  
   `git push origin feature/amazing-feature`
5. Open a Pull Request

---

## License

This project is licensed under the [MIT License](LICENSE).

---

## Acknowledgments

- Built by [DNSK WORK](https://dnsk.work/)
- Inspired by SaaS retention benchmarks and UX ROI research
