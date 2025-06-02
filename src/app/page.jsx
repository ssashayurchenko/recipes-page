import Title from "@/components/title-section/TitleSection";
import SearchForm from "@/components/search-form/SearchForm";
import "./globals.css";
export default function Home() {
  return (
    <div className="max-w-4xl mx-auto px-4 md:px-8 lg:px-16">
      <Title />
      <SearchForm />
    </div>
  );
}
