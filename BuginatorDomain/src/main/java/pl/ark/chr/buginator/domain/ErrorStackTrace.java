package pl.ark.chr.buginator.domain;

import javax.persistence.*;

/**
 * Created by Arek on 2016-09-26.
 */
@Entity
@Table(name = "buginator_error_stack_trace",
        indexes = {@Index(name = "error_index", columnList = "buginator_error_id")
        })
@SequenceGenerator(name = "default_gen", sequenceName = "buginator_error_stack_trace_seq", allocationSize = 1)
public class ErrorStackTrace extends BaseEntity {

    private static final long serialVersionUID = 5055088228557459563L;

    @Column(name = "stack_trace")
    private String stackTrace;

    @ManyToOne
    @JoinColumn(name = "buginator_error_id", nullable = false)
    private Error error;

    @Column(name = "stack_trace_order")
    private Integer stackTraceOrder;

    public String getStackTrace() {
        return stackTrace;
    }

    public void setStackTrace(String stackTrace) {
        this.stackTrace = stackTrace;
    }

    public Error getError() {
        return error;
    }

    public void setError(Error error) {
        this.error = error;
    }

    public Integer getStackTraceOrder() {
        return stackTraceOrder;
    }

    public void setStackTraceOrder(Integer stackTraceOrder) {
        this.stackTraceOrder = stackTraceOrder;
    }
}
