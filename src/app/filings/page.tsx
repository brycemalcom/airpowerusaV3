"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import InvestorForm from "@/components/sections/InvestorForm";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, ExternalLink, Download, Shield, Calendar, DollarSign } from "lucide-react";

// Note: metadata moved to layout.tsx or will be handled via Next.js head

const secFilingData = {
  accessionNumber: "000107997325001341",
  filingDate: "2025-08-19",
  formType: "D",
  companyName: "Air Power USA",
  cik: "0002080497",
  entityType: "Corporation",
  yearOfInc: "2023",
  jurisdictionOfInc: "WYOMING",
  address: {
    street: "30 N GOULD ST STE R",
    city: "SHERIDAN",
    state: "WY",
    zipCode: "82801"
  },
  phone: "214-257-7957",
  industryGroup: "Electric Utilities",
  revenueRange: "No Revenues",
  federalExemption: "06c",
  totalOfferingAmount: 25000000,
  totalAmountSold: 0,
  totalRemaining: 25000000,
  minimumInvestment: 10000,
  hasNonAccreditedInvestors: false,
  totalInvestors: 0,
  salesCommissions: 0,
  findersFees: 0,
  grossProceedsUsed: 100000,
  signer: {
    name: "Brianna Stoecklein",
    title: "President",
    relationships: ["Executive Officer", "Director"]
  },
  officialUrl: "https://www.sec.gov/Archives/edgar/data/2080497/000107997325001341/xslFormDX01/primary_doc.xml"
};

export default function FilingsPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        {/* Background */}
        <div className="absolute inset-0 w-full h-full">
          {/* Enhanced gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
            {/* Animated gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-cyan-500/10 to-purple-600/20 animate-gradient-x"></div>
          </div>
          
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/70" />
        </div>
        
        {/* Content */}
        <div className="relative z-20 mx-auto max-w-7xl px-6 py-16 text-center lg:px-8">
          {/* Main headline */}
          <h1 className="mx-auto max-w-4xl text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl drop-shadow-2xl">
            <span style={{ textShadow: '3px 3px 6px rgba(0,0,0,0.8), 0 0 20px rgba(0,0,0,0.5)' }}>
              SEC
            </span>
            <span 
              className="block bg-gradient-to-r from-yellow-400 to-orange-300 bg-clip-text text-transparent"
              style={{ 
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                paddingBottom: '8px',
                marginBottom: '8px',
                color: '#facc15', // fallback color
                textShadow: 'none' // Remove conflicting text-shadow
              }}
            >
              Filings
            </span>
          </h1>
          
          {/* Subheadline */}
          <p 
            className="mx-auto mt-8 max-w-3xl text-lg leading-relaxed text-white/90 sm:text-xl lg:text-2xl font-light"
            style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8), 0 0 15px rgba(0,0,0,0.6)' }}
          >
            Transparent regulatory disclosures and official SEC documentation for our Regulation D offering.
          </p>

          {/* Key filing info */}
          <div className="mt-12">
            <div className="inline-flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-8 bg-black/30 backdrop-blur-sm rounded-2xl px-6 sm:px-8 py-6 sm:py-4 border border-white/20">
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400">$25M</div>
                <div className="text-sm text-white/70">Total Offering</div>
              </div>
              <div className="hidden sm:block w-px h-12 bg-white/20"></div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-400">$10K</div>
                <div className="text-sm text-white/70">Min Investment</div>
              </div>
              <div className="hidden sm:block w-px h-12 bg-white/20"></div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-300">506(c)</div>
                <div className="text-sm text-white/70">Rule</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background/90 to-transparent z-10" />
      </section>

      {/* Filing Overview Section */}
      <section className="py-24 bg-gradient-to-b from-background to-slate-900">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
              <Shield className="mr-2 h-4 w-4" />
              Official SEC Documentation
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl mb-4">
              Current SEC Form D Filing
            </h2>
            <p className="text-lg text-white/80 max-w-3xl mx-auto">
              Our official Form D filing with the Securities and Exchange Commission for our Regulation D offering. 
              All information is publicly available through the SEC's EDGAR database.
            </p>
          </div>

          {/* Filing Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Filing Details Card */}
            <Card className="border-yellow-500/20 bg-black/30 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <FileText className="mr-3 h-6 w-6 text-yellow-400" />
                  Filing Details
                </CardTitle>
                <CardDescription className="text-white/70">
                  Official SEC Form D information and filing metadata
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-white/60">Form Type</div>
                    <div className="text-white font-semibold">{secFilingData.formType}</div>
                  </div>
                  <div>
                    <div className="text-sm text-white/60">Filing Date</div>
                    <div className="text-white font-semibold">{secFilingData.filingDate}</div>
                  </div>
                  <div className="col-span-2">
                    <div className="text-sm text-white/60">Accession Number</div>
                    <div className="text-white font-mono text-sm bg-slate-800/50 p-2 rounded">
                      {secFilingData.accessionNumber}
                    </div>
                  </div>
                  <div className="col-span-2">
                    <div className="text-sm text-white/60">Company CIK</div>
                    <div className="text-white font-mono text-sm">{secFilingData.cik}</div>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-white/10">
                  <Button 
                    className="w-full bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-500 hover:to-orange-500 text-white"
                    onClick={() => window.open(secFilingData.officialUrl, '_blank')}
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    View Official SEC Filing
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Access Card */}
            <Card className="border-orange-500/20 bg-black/30 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Download className="mr-3 h-6 w-6 text-orange-400" />
                  Quick Access
                </CardTitle>
                <CardDescription className="text-white/70">
                  Direct links to different formats of our SEC filing
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <Button 
                    variant="outline" 
                    className="w-full bg-white/5 border-white/20 text-white hover:bg-white/10"
                    onClick={() => window.open(secFilingData.officialUrl, '_blank')}
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    XML Format (Official)
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full bg-white/5 border-white/20 text-white hover:bg-white/10"
                    onClick={() => window.open(`https://www.sec.gov/Archives/edgar/data/2080497/000107997325001341/primary_doc.html`, '_blank')}
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    HTML Format
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full bg-white/5 border-white/20 text-white hover:bg-white/10"
                    onClick={() => window.open(`https://www.sec.gov/Archives/edgar/data/2080497/000107997325001341/primary_doc.txt`, '_blank')}
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    Text Format
                  </Button>
                </div>
                
                <div className="pt-4 border-t border-white/10">
                  <p className="text-xs text-white/60 text-center">
                    All formats link directly to SEC.gov official sources
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* SEC Notice */}
          <div className="bg-gradient-to-r from-yellow-900/20 to-orange-900/20 border border-yellow-500/30 rounded-xl p-6 mb-12">
            <div className="flex items-start space-x-4">
              <Shield className="h-6 w-6 text-yellow-400 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Official SEC Documentation</h3>
                <p className="text-white/80 text-sm leading-relaxed">
                  This Form D filing is the official record of our Regulation D offering filed with the U.S. Securities and Exchange Commission. 
                  The information contained herein is publicly available through the SEC's EDGAR database and represents our commitment to 
                  regulatory compliance and transparency with investors. 
                  <a 
                    href={secFilingData.officialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-yellow-400 hover:text-yellow-300 underline ml-1"
                  >
                    View the complete filing on SEC.gov
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filing Content Preview Section */}
      <section className="py-24 bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-gradient-to-r from-orange-500 to-red-500 text-white">
              <Calendar className="mr-2 h-4 w-4" />
              Filing Summary
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl mb-4">
              Form D Summary
            </h2>
            <p className="text-lg text-white/80 max-w-3xl mx-auto">
              Key information from our SEC Form D filing. For complete details and the most current information, 
              <a 
                href={secFilingData.officialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange-400 hover:text-orange-300 underline ml-1"
              >
                refer to the official SEC filing
              </a>
              .
            </p>
          </div>

          <Card className="border-orange-500/20 bg-black/30 backdrop-blur-sm max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="text-white flex items-center justify-between">
                <span className="flex items-center">
                  <DollarSign className="mr-3 h-6 w-6 text-orange-400" />
                  Regulation D Offering Information
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-orange-400 hover:text-orange-300"
                  onClick={() => window.open(secFilingData.officialUrl, '_blank')}
                >
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Key Terms */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white border-b border-white/10 pb-2">
                    Offering Details
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-white/60">Form Type:</span>
                      <span className="text-white">{secFilingData.formType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">Federal Exemption:</span>
                      <span className="text-white">{secFilingData.federalExemption}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">Industry Group:</span>
                      <span className="text-white">{secFilingData.industryGroup}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">Security Type:</span>
                      <span className="text-white">Equity</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">Total Offering:</span>
                      <span className="text-white">${(secFilingData.totalOfferingAmount / 1000000).toFixed(0)}M</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">Min Investment:</span>
                      <span className="text-white">${secFilingData.minimumInvestment.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white border-b border-white/10 pb-2">
                    Company Information
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-white/60">Entity Name:</span>
                      <span className="text-white">{secFilingData.companyName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">Entity Type:</span>
                      <span className="text-white">{secFilingData.entityType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">Year of Inc:</span>
                      <span className="text-white">{secFilingData.yearOfInc}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">Jurisdiction:</span>
                      <span className="text-white">{secFilingData.jurisdictionOfInc}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">Revenue Range:</span>
                      <span className="text-white">{secFilingData.revenueRange}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">CIK:</span>
                      <span className="text-white font-mono">{secFilingData.cik}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Offering Progress */}
              <div className="mt-8 p-6 bg-gradient-to-r from-blue-900/20 to-cyan-900/20 border border-blue-500/30 rounded-lg">
                <h3 className="text-lg font-semibold text-white mb-4">Offering Progress</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                  <div>
                    <div className="text-2xl font-bold text-blue-400">${(secFilingData.totalOfferingAmount / 1000000).toFixed(0)}M</div>
                    <div className="text-sm text-white/70">Total Authorized</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-cyan-400">${(secFilingData.totalAmountSold / 1000000).toFixed(0)}M</div>
                    <div className="text-sm text-white/70">Amount Sold</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-cyan-300">${(secFilingData.totalRemaining / 1000000).toFixed(0)}M</div>
                    <div className="text-sm text-white/70">Remaining</div>
                  </div>
                </div>
              </div>

              {/* Executive Information */}
              <div className="mt-6 p-4 bg-slate-800/30 border border-white/10 rounded-lg">
                <h4 className="text-md font-semibold text-white mb-3">Authorized Representative</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-white/60">Name: </span>
                    <span className="text-white">{secFilingData.signer.name}</span>
                  </div>
                  <div>
                    <span className="text-white/60">Title: </span>
                    <span className="text-white">{secFilingData.signer.title}</span>
                  </div>
                  <div className="md:col-span-2">
                    <span className="text-white/60">Roles: </span>
                    <span className="text-white">{secFilingData.signer.relationships.join(", ")}</span>
                  </div>
                </div>
              </div>

              {/* Official Source Notice */}
              <div className="bg-orange-900/20 border border-orange-500/30 rounded-lg p-4 mt-6">
                <p className="text-white/80 text-sm leading-relaxed">
                  <strong className="text-orange-400">Important:</strong> This summary is provided for convenience only. 
                  For complete and legally binding information, including all terms, conditions, and disclosures, 
                  please refer to the 
                  <a 
                    href={secFilingData.officialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-orange-400 hover:text-orange-300 underline mx-1"
                  >
                    official Form D filing on SEC.gov
                  </a>
                  . All investment decisions should be based on the complete SEC documentation and consultation with 
                  qualified financial advisors.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Investor Contact Form */}
      <InvestorForm />
      
      <Footer />
    </main>
  );
}
