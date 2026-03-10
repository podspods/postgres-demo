import React, { useState, useEffect } from "react";
import { motorcycleBrandService } from "../services/motorcycleBrand.service";
import { MotorcycleBrand, CreateMotorcycleBrandDto } from "../types/motorcycleBrand.types";

/**
 * Motorcycle Brand List Component
 * Displays and manages motorcycle brands with full CRUD operations
 */
const MotorcycleBrandList: React.FC = () => {
  // State
  const [brands, setBrands] = useState<MotorcycleBrand[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [editingBrand, setEditingBrand] = useState<MotorcycleBrand | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [formData, setFormData] = useState<CreateMotorcycleBrandDto>({
    brandName: "",
    countryOfOrigin: "",
    createdBy: "user",
  });

  // Load brands on mount and when page changes
  useEffect(() => {
    loadBrands();
  }, [page]);

  /**
   * Load brands from API
   */
  const loadBrands = async (): Promise<void> => {
    setLoading(true);
    try {
      const response = await motorcycleBrandService.getAll({ page, limit: 10 });
      setBrands(response.data || []);
      setTotalPages(response.pagination?.pages || 1);
      setError(null);
    } catch (err) {
      setError("Failed to load brands");
      console.error("Error loading brands:", err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handle search
   */
  const handleSearch = async (): Promise<void> => {
    if (!searchTerm.trim()) {
      loadBrands();
      return;
    }

    setLoading(true);
    try {
      const response = await motorcycleBrandService.search(searchTerm);
      setBrands(response.data || []);
      setError(null);
    } catch (err) {
      setError("Search failed");
      console.error("Error searching:", err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handle input change in form
   */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  /**
   * Handle form submission (create or update)
   */
  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    try {
      if (editingBrand) {
        await motorcycleBrandService.update(editingBrand.brandId, formData);
      } else {
        await motorcycleBrandService.create(formData);
      }

      // Reset form and reload
      setShowForm(false);
      setEditingBrand(null);
      setFormData({ brandName: "", countryOfOrigin: "", createdBy: "user" });
      loadBrands();
      setError(null);
    } catch (err) {
      setError("Failed to save brand");
      console.error("Error saving brand:", err);
    }
  };

  /**
   * Handle edit button click
   */
  const handleEdit = (brand: MotorcycleBrand): void => {
    setEditingBrand(brand);
    setFormData({
      brandName: brand.brandName,
      countryOfOrigin: brand.countryOfOrigin,
      createdBy: brand.createdBy,
    });
    setShowForm(true);
  };

  /**
   * Handle delete button click
   */
  const handleDelete = async (id: number): Promise<void> => {
    if (!window.confirm("Are you sure you want to delete this brand?")) return;

    try {
      await motorcycleBrandService.delete(id);
      loadBrands();
      setError(null);
    } catch (err) {
      setError("Failed to delete brand");
      console.error("Error deleting brand:", err);
    }
  };

  /**
   * Handle cancel button click
   */
  const handleCancel = (): void => {
    setShowForm(false);
    setEditingBrand(null);
    setFormData({ brandName: "", countryOfOrigin: "", createdBy: "user" });
  };

  // Styles
  const styles = {
    container: {
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "20px",
      fontFamily: "system-ui, -apple-system, sans-serif",
    },
    header: {
      display: "flex" as const,
      justifyContent: "space-between" as const,
      alignItems: "center" as const,
      marginBottom: "20px",
    },
    title: {
      color: "#2563eb",
      margin: 0,
      fontSize: "2rem",
    },
    button: {
      backgroundColor: "#2563eb",
      color: "white",
      padding: "10px 20px",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      fontSize: "14px",
      transition: "background-color 0.2s",
    },
    buttonDanger: {
      backgroundColor: "#ef4444",
      color: "white",
      padding: "5px 10px",
      border: "none",
      borderRadius: "3px",
      cursor: "pointer",
      marginRight: "5px",
      fontSize: "12px",
    },
    buttonEdit: {
      backgroundColor: "#10b981",
      color: "white",
      padding: "5px 10px",
      border: "none",
      borderRadius: "3px",
      cursor: "pointer",
      marginRight: "5px",
      fontSize: "12px",
    },
    searchContainer: {
      display: "flex" as const,
      gap: "10px",
      marginBottom: "20px",
    },
    searchInput: {
      flex: 1,
      padding: "8px 12px",
      border: "1px solid #e5e7eb",
      borderRadius: "5px",
      fontSize: "14px",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse" as const,
      backgroundColor: "white",
      boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
      borderRadius: "5px",
      overflow: "hidden",
    },
    th: {
      backgroundColor: "#f3f4f6",
      padding: "12px",
      textAlign: "left" as const,
      borderBottom: "2px solid #e5e7eb",
      fontWeight: 600,
    },
    td: {
      padding: "12px",
      borderBottom: "1px solid #e5e7eb",
    },
    form: {
      backgroundColor: "white",
      padding: "20px",
      borderRadius: "5px",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      marginBottom: "20px",
    },
    input: {
      width: "100%",
      padding: "8px 12px",
      marginBottom: "10px",
      border: "1px solid #e5e7eb",
      borderRadius: "3px",
      fontSize: "14px",
    },
    formButtons: {
      display: "flex" as const,
      gap: "10px",
      marginTop: "10px",
    },
    error: {
      backgroundColor: "#fee2e2",
      color: "#ef4444",
      padding: "10px",
      borderRadius: "5px",
      marginBottom: "20px",
    },
    pagination: {
      display: "flex" as const,
      justifyContent: "center" as const,
      gap: "10px",
      marginTop: "20px",
    },
    pageButton: {
      padding: "5px 10px",
      border: "1px solid #e5e7eb",
      borderRadius: "3px",
      cursor: "pointer",
      backgroundColor: "white",
    },
    loading: {
      textAlign: "center" as const,
      padding: "40px",
      color: "#6b7280",
    },
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.title}>Motorcycle Brands</h1>
        <button
          style={styles.button}
          onClick={() => setShowForm(true)}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#1d4ed8")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#2563eb")}
        >
          + Add New Brand
        </button>
      </div>

      {/* Error message */}
      {error && <div style={styles.error}>{error}</div>}

      {/* Search bar */}
      <div style={styles.searchContainer}>
        <input
          type="text"
          style={styles.searchInput}
          placeholder="Search brands by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSearch()}
        />
        <button style={styles.button} onClick={handleSearch}>
          Search
        </button>
      </div>

      {/* Create/Edit Form */}
      {showForm && (
        <div style={styles.form}>
          <h3 style={{ marginTop: 0, color: "#2563eb" }}>
            {editingBrand ? "✏️ Edit Brand" : "➕ New Brand"}
          </h3>
          <form onSubmit={handleSubmit}>
            <input
              style={styles.input}
              type="text"
              name="brandName"
              placeholder="Brand Name (e.g., Honda)"
              value={formData.brandName}
              onChange={handleInputChange}
              required
            />
            <input
              style={styles.input}
              type="text"
              name="countryOfOrigin"
              placeholder="Country of Origin (e.g., Japan)"
              value={formData.countryOfOrigin}
              onChange={handleInputChange}
              required
            />
            <div style={styles.formButtons}>
              <button style={{ ...styles.button, flex: 1 }} type="submit">
                {editingBrand ? "Update Brand" : "Create Brand"}
              </button>
              <button
                style={{ ...styles.button, backgroundColor: "#6b7280", flex: 1 }}
                type="button"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Brands Table */}
      {loading ? (
        <div style={styles.loading}>Loading brands...</div>
      ) : (
        <>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>ID</th>
                <th style={styles.th}>Brand Name</th>
                <th style={styles.th}>Country of Origin</th>
                <th style={styles.th}>Created By</th>
                <th style={styles.th}>Created Date</th>
                <th style={styles.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {brands.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ ...styles.td, textAlign: "center" }}>
                    No brands found
                  </td>
                </tr>
              ) : (
                brands.map((brand) => (
                  <tr key={brand.brandId} style={{ cursor: "pointer" }}>
                    <td style={styles.td}>{brand.brandId}</td>
                    <td style={styles.td}>{brand.brandName}</td>
                    <td style={styles.td}>{brand.countryOfOrigin}</td>
                    <td style={styles.td}>{brand.createdBy}</td>
                    <td style={styles.td}>{new Date(brand.createDate).toLocaleDateString()}</td>
                    <td style={styles.td}>
                      <button style={styles.buttonEdit} onClick={() => handleEdit(brand)}>
                        Edit
                      </button>
                      <button
                        style={styles.buttonDanger}
                        onClick={() => handleDelete(brand.brandId)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {/* Pagination */}
          {totalPages > 1 && (
            <div style={styles.pagination}>
              <button
                style={styles.pageButton}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
              >
                ← Previous
              </button>
              <span style={{ padding: "5px 10px" }}>
                Page {page} of {totalPages}
              </span>
              <button
                style={styles.pageButton}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
              >
                Next →
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MotorcycleBrandList;
