export default function Loader() {
  return (
    <div className="h-full flex justify-center items-center">
      <div
        className="animate-spin inline-block size-6 md:size-10 border-3 border-current border-t-transparent text-blue-600 rounded-full"
        role="status"
        aria-label="loading"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}
