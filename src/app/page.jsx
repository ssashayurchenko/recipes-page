import Title from "@/components/title-section/TitleSection";
import SearchForm from "@/components/search-form/SearchForm";
import "./global.css";

export default function Home() {
  return (
    <div className="min-h-screen flex justify-center items-center px-4">
      <div className="w-full max-w-md p-6">
        <Title />
        <SearchForm />
      </div>
    </div>
  );
}
