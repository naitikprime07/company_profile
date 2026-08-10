import { useMemo, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Eye,
  Mail,
  Phone,
  Search,
  Trash2,
} from "lucide-react";
import InquiryDateFilter from "./InquiryDateFilter";
import styles from "./AdminRecordsTable.module.css";

export default function AdminRecordsTable({
  items,
  statuses,
  onDelete,
  onView,
  roleLabel = "Role",
  roleValue,
}) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [page, setPage] = useState(1);
  const filtered = useMemo(
    () =>
      items.filter((item) => {
        const text = [
          item.firstName,
          item.lastName,
          item.email,
          item.phone,
          item.location,
          roleValue(item),
        ]
          .join(" ")
          .toLowerCase();
        const date = String(item.createdAt || "").slice(0, 10);
        return (
          (!search || text.includes(search.toLowerCase())) &&
          (status === "all" || item.status === status) &&
          (!from || date >= from) &&
          (!to || date <= to)
        );
      }),
    [from, items, roleValue, search, status, to],
  );
  const pages = Math.max(1, Math.ceil(filtered.length / 10));
  const shown = filtered.slice((page - 1) * 10, page * 10);
  const reset = (fn) => (value) => {
    fn(value);
    setPage(1);
  };
  return (
    <>
      <div className={styles.tools}>
        <label>
          <Search size={14} />
          <input
            value={search}
            onChange={(e) => reset(setSearch)(e.target.value)}
            placeholder="Search name, email, number or role…"
          />
        </label>
        <InquiryDateFilter
          fromDate={from}
          toDate={to}
          onApply={(start, end) => {
            setFrom(start);
            setTo(end);
            setPage(1);
          }}
        />
        <div>
          {[["all", "All"], ...Object.entries(statuses)].map(
            ([value, label]) => (
              <button
                type="button"
                className={status === value ? styles.active : ""}
                onClick={() => reset(setStatus)(value)}
                key={value}
              >
                {label}
              </button>
            ),
          )}
        </div>
      </div>
      <div className={styles.summary}>
        Showing {shown.length} of {filtered.length} records
      </div>
      {shown.length === 0 ? (
        <p className={styles.empty}>No records match these filters.</p>
      ) : (
        <div className={styles.wrap}>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Number</th>
                <th>{roleLabel}</th>
                <th>Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {shown.map((item) => (
                <tr key={item._id}>
                  <td>
                    <strong>
                      {item.firstName} {item.lastName}
                    </strong>
                  </td>
                  <td>
                    <a href={`mailto:${item.email}`}>
                      <Mail size={12} />
                      {item.email}
                    </a>
                  </td>
                  <td>
                    <a href={`tel:${item.phone}`}>
                      <Phone size={12} />
                      {item.phone}
                    </a>
                  </td>
                  <td>{roleValue(item)}</td>
                  <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                  <td>
                    <b>{statuses[item.status] || item.status}</b>
                  </td>
                  <td>
                    <div className={styles.actions}>
                      <button
                        title="View"
                        aria-label="View details"
                        onClick={() => onView(item)}
                      >
                        <Eye size={15} />
                      </button>
                      <button
                        title="Delete"
                        aria-label="Delete record"
                        onClick={() => onDelete(item)}
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <nav className={styles.pagination}>
        <span>
          Page {Math.min(page, pages)} of {pages}
        </span>
        <div>
          <button disabled={page <= 1} onClick={() => setPage((v) => v - 1)}>
            <ChevronLeft size={14} /> Previous
          </button>
          {Array.from({ length: pages }, (_, i) => i + 1).map((number) => (
            <button
              className={page === number ? styles.current : ""}
              key={number}
              onClick={() => setPage(number)}
            >
              {number}
            </button>
          ))}
          <button
            disabled={page >= pages}
            onClick={() => setPage((v) => v + 1)}
          >
            Next <ChevronRight size={14} />
          </button>
        </div>
      </nav>
    </>
  );
}
